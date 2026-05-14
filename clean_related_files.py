import os
import re

wiki_path = r"d:\2026\code\Web3-AI-Agent-Homepage\content\wiki"

# Walk through all .md files
for root, dirs, files in os.walk(wiki_path):
    for filename in files:
        if filename.endswith('.md'):
            filepath = os.path.join(root, filename)
            
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            
            # Pattern 1: Remove "- 相关文件" followed by lines starting with "- ["
            content = re.sub(r'\n- 相关文件\n(  - \[.*?\]\(file://.*?\)\n)+', '\n', content)
            content = re.sub(r'\n- 相关文件\n(- \[.*?\]\(file://.*?\)\n)+', '\n', content)
            
            # Pattern 2: Also handle "**相关文件**" if exists
            content = re.sub(r'\n\*\*相关文件\*\*\n(  - \[.*?\]\(file://.*?\)\n)+', '\n', content)
            content = re.sub(r'\n\*\*相关文件\*\*\n(- \[.*?\]\(file://.*?\)\n)+', '\n', content)
            
            # Clean up multiple blank lines (3 or more -> 2)
            content = re.sub(r'\n{3,}', '\n\n', content)
            
            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Cleaned: {filename}")

print("\nCleanup completed!")
