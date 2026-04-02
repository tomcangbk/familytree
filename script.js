function createMemberDiv(person) {
  const div = document.createElement('div');
  div.className = 'member';
  if (person.avatar) {
    const img = document.createElement('img');
    img.src = person.avatar;
    div.appendChild(img);
  }
  div.appendChild(document.createTextNode(person.name));
  return div;
}

function renderFamily(member) {
  const container = document.createElement('div');

  // family unit
  const familyDiv = document.createElement('div');
  familyDiv.className = 'family-unit';

  const husbandDiv = createMemberDiv(member);
  familyDiv.appendChild(husbandDiv);

  if (member.spouse) {
    const connector = document.createElement('div');
    connector.className = 'connector';
    familyDiv.appendChild(connector);

    const spouseDiv = createMemberDiv(member.spouse);
    familyDiv.appendChild(spouseDiv);
  }

  container.appendChild(familyDiv);

  // children
  if (member.children && member.children.length > 0) {
    const ul = document.createElement('ul');
    ul.className = 'children';

    member.children.forEach(child => {
      const li = document.createElement('li');
      if (child.gender === 'female') {
        li.appendChild(createMemberDiv(child));
        if (child.spouse) {
          li.appendChild(createMemberDiv(child.spouse));
        }
      } else {
        li.appendChild(renderFamily(child));
      }
      ul.appendChild(li);
    });

    container.appendChild(ul);
  }

  return container;
}

async function loadTree() {
  const response = await fetch('family.json');
  const data = await response.json();
  console.log("Loaded family data:", data);
  const treeDiv = document.getElementById('tree');
  treeDiv.appendChild(renderFamily(data));
}
loadTree();
